import { bcryptAdapter, JWTAdapter } from "../../config";
import { UserModel } from "../../data";
import {
  CustomError,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from "../../domain";

export class AuthService {
  constructor() {}

  public async registerUser(dto: RegisterUserDto) {
    // Check if email already exists
    const existUser = await UserModel.findOne({ email: dto.email });
    if (existUser) throw CustomError.badRequest("Email already exists");

    try {
      // Create user, encrypt password and save
      const user = new UserModel(dto);
      user.password = bcryptAdapter.hash(dto.password);
      await user.save();

      // JWT -> Generate token to validate email
      // Send email to user

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
    const token = await JWTAdapter.generateToken({
      id: user.id,
      email: user.email,
    });
    if (!token) throw CustomError.internalServer("Error generating JWT");

    // Return user and token
    const { password, ...userEntity } = UserEntity.fromObject(user);
    return {
      user: userEntity,
      token,
    };
  }
}
