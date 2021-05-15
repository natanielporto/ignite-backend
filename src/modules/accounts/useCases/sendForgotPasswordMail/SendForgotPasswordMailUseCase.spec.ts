import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UserTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let userTokensRepositoryInMemory: UserTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send Forgot mail e-mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    userTokensRepositoryInMemory = new UserTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      userTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("should be able to send a forgot password mail to the user", async () => {
    const sendMail = spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      drivers_license: "666666",
      email: "666@666.com",
      name: "666",
      password: "yougessedit",
    });

    await sendForgotPasswordMailUseCase.execute("666@666.com");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send a forgot password mail to a non existing user", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("555@gmail.com")
    ).rejects.toEqual(new AppError("User does not exist."));
  });

  it("should be able to create an users token", async () => {
    const generateToken = spyOn(userTokensRepositoryInMemory, "create");

    usersRepositoryInMemory.create({
      drivers_license: "666666",
      email: "666@666.com",
      name: "666",
      password: "yougessedit",
    });

    await sendForgotPasswordMailUseCase.execute("666@666.com");

    expect(generateToken).toBeCalled();
  });
});
