interface IUserResponseDTO {
  email: string;
  name: string;
  id: string;
  avatar: string;
  drivers_license: string;
  avatar_url(): string;
}

export { IUserResponseDTO };
