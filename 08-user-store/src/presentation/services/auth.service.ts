import { bcryptAdapter, JWTAdapter } from "../../config";
import { UserModel } from "../../data";
import {
  CustomError,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from "../../domain";
import { EmailService } from "./email.service";

export class AuthService {
  constructor(
    private readonly emailService: EmailService,
    private readonly webServiceUrl: string
  ) {}

  public async registerUser(dto: RegisterUserDto) {
    // Check if email already exists
    const existUser = await UserModel.findOne({ email: dto.email });
    if (existUser) throw CustomError.badRequest("Email already exists");

    try {
      // Create user, encrypt password and save
      const user = new UserModel(dto);
      user.password = bcryptAdapter.hash(dto.password);
      await user.save();

      // Send email to user
      await this.sendEmailValidationLink(user.email);

      // Return user and token
      const { password, ...userEntity } = UserEntity.fromObject(user);
      return {
        user: userEntity,
        token: "token",
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async loginUser(dto: LoginUserDto) {
    // Search user by email
    const user = await UserModel.findOne({ email: dto.email });
    if (!user) throw CustomError.notFound("User not found");

    // Validate password
    if (!bcryptAdapter.compare(dto.password, user.password))
      throw CustomError.unauthorized("Password is incorrect");

    // JWT -> Generate token
    const token = await JWTAdapter.generateToken({ id: user.id });
    if (!token) throw CustomError.internalServer("Error generating JWT");

    // Return user and token
    const { password, ...userEntity } = UserEntity.fromObject(user);
    return {
      user: userEntity,
      token,
    };
  }

  public async validateEmail(token: string) {
    const payload = await JWTAdapter.verifyToken(token);
    if (!payload) throw CustomError.unauthorized("Invalid token");

    const { email } = payload as { email: string };
    if (!email) throw CustomError.internalServer("Email not in token");

    const user = await UserModel.findOne({ email });
    if (!user) throw CustomError.internalServer("Email not exist");

    user.emailValidated = true;
    await user.save();

    return true;
  }

  private sendEmailValidationLink = async (email: string) => {
    // JWT -> Generate token to validate email
    const token = await JWTAdapter.generateToken({ email });
    if (!token) throw CustomError.internalServer("Error generating JWT");

    const link = `${this.webServiceUrl}/auth/validate-email/${token}`;

    const html = `
      <h1>Validate your email</h1>
      <p>Click on the following link to validate your email</p>
      <a href="${link}">Validate email: ${email}</a>
    `;

    const isSent = await this.emailService.sendEmail({
      to: email,
      subject: "Validate your email",
      htmlBody: html,
    });

    if (!isSent) throw CustomError.internalServer("Error sending email");

    return true;
  };
}
