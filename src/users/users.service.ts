import { Injectable } from '@nestjs/common';
import { CreateUserDto, Role } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';

@Injectable()
export class UsersService {
  // this is a private property in the class.
  private users = [
    {
      id: 1,
      name: 'Leanne Graham',
      email: 'Sincere@april.biz',
      role: 'intern',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      email: 'Shanna@melissa.tv',
      role: 'intern',
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      email: 'Nathan@yesenia.net',
      role: 'engineer',
    },
    {
      id: 4,
      name: 'Patricia Lebsack',
      email: 'Julianne.OConner@kory.org',
      role: 'engineer',
    },
    {
      id: 5,
      name: 'Chelsey Dietrich',
      email: 'Lucio_Hettinger@annie.ca',
      role: 'admin',
    },
  ];

  // create the methods based on the controller functions
  findAll(role?: Role) {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }

  create(createUserDto: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  updateOne(id: number, updateUserDto: UpdateUserDto) {
    // const user = this.users.find((user) => user.id === +id);
    // if (!user) {
    //   return 'User not found';
    // }

    this.users = this.users.map((user) => {
      if (user.id === +id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });

    return this.findOne(id); // return the updated user
  }

  deleteOne(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== +id);
    return removedUser;
  }
}
