import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";

import { IUserTokensRepository } from "../IUserTokensRepository";

class UserTokensRepositoryInMemory implements IUserTokensRepository {
  userTokens: UserTokens[] = [];

  async create({
    expiration_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();
    Object.assign(userToken, {
      expiration_date,
      refresh_token,
      user_id,
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    return this.userTokens.find(
      (el) => el.user_id === user_id && el.refresh_token === refresh_token
    );
  }

  async deleteById(id: string): Promise<void> {
    const userToken = this.userTokens.find((el) => el.id === id);
    this.userTokens.splice(this.userTokens.indexOf(userToken));
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    return this.userTokens.find((el) => el.refresh_token === refresh_token);
  }
}

export { UserTokensRepositoryInMemory };
