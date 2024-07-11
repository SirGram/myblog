

export interface IUser {
  _id: string;
  fullname: string;
  username: string;
  password?:string;
  email?:string;
  registrationDate: string;
  settings: {
    _id?: string;
    about?: string;
    avatarImage?: string;
  };
}

export interface IComment {
  _id: string;
  content?: string;
  user?: string;
  creationDate?: string;
}

export interface IBlogEntry {
  _id: string;
  title: string;
  content: string;
  image?: string;
  user: IUser;
  creationDate: string;
  published: boolean;
  likes: number;
  visits: number;
  comments: IComment[];
  lastEditionDate?:string
}
