export default interface ICreateUserDTO {
  id?: string;
  avatar?: string;
  name: string;
  email: string;
  password: string;
  drivers_license: string;
}
