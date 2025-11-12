import bcrypt from 'bcryptjs'; //import thu viện bcryptjs
import db from '../models/index'; //import database

const salt = bcrypt.genSaltSync(10); // thuật toán hash password

let createNewUser = (data: any): Promise<string> => { //hàm tạo user với tham số data
  return new Promise<string>(async (resolve, reject) => { //dùng Promise đảm bảo luôn trả kết quả, trong xử lý bất đồng bộ
    try {
      let hashPasswordFromBcrypt = await hashUserPassword(data.password)
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender === '1' ? true : false,
        roleId: data.roleId
      })
      resolve('OK create a new user successfull');
    } catch (e) {
      reject(e)
    }
  })
}

let hashUserPassword = (password: string): Promise<string> => {
  return new Promise<string>(async (resolve, reject) => { //dùng Promise đảm bảo luôn trả kết quả, trong xử lý bất đồng bộ
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  })
}

// lấy tất cả findAll CRUD
let getAllUser = (): Promise<any[]> => {
  return new Promise<any[]>(async (resolve, reject) => { //dùng Promise đảm bảo luôn trả kết quả, trong xử lý bất đồng bộ
    try {
      let users = await db.User.findAll({ // <-- Đã thêm await (code gốc của bạn bị thiếu)
        raw: true, //hiển dữ liệu gốc
      });
      resolve(users); //hàm trả về kết quả
    } catch (e) {
      reject(e)
    }
  })
}

//lấy findOne CRUD
let getUserInfoById = (userId: string): Promise<any> => {
  return new Promise<any>(async (resolve, reject) => { //dùng Promise đảm bảo luôn trả kết quả, trong xử lý bất đồng bộ
    try {
      let user = await db.User.findOne({
        where: { id: userId }, //query điều kiện cho tham số
        raw: true
      });

      if (user) {
        resolve(user); //hàm trả về kết quả
      } else {
        resolve([]); //hàm trả về kết quả rỗng
      }
    } catch (e) {
      reject(e)
    }
  })
}

//hàm put CRUD
let updateUser = (data: any): Promise<any[] | void> => {
  return new Promise<any[] | void>(async (resolve, reject) => { //dùng Promise đảm bảo luôn trả kết quả, trong xử lý bất đồng bộ
    try {
      let user = await db.User.findOne({
        where: { id: data.id } //query điều kiện cho tham số
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        await user.save();

        let allusers = await db.User.findAll();
        resolve(allusers);
      } else {
        resolve(); //hàm trả về kết quả rồng
      }
    } catch (e) {
      reject(e)
    }
  })
}

//hàm xóa user
let deleteUserById = (userId: string): Promise<void> => {
  return new Promise<void>(async (resolve, reject) => { //dùng Promise đảm bảo luôn trả kết quả, trong xử lý bất đồng bộ
    try {
      let user = await db.User.findOne({
        where: { id: userId }
      })
      if (user) {
        await user.destroy();
      }
      resolve(); //là return
    }
    catch (e) {
      reject(e);
    }
  })
}

export default { 
  createNewUser: createNewUser,
  getAllUser: getAllUser,
  getUserInfoById: getUserInfoById,
  updateUser: updateUser,
  deleteUserById: deleteUserById
}