"use strict";
import User from '../entity/user.entity.js';
import { AppDataSource } from '../config/configDb.js';

export async function createUserService(dataUser) {
    try {
        const userRepository = AppDataSource.getRepository(User);

        const newUser = userRepository.create({
            nombreCompleto: dataUser.nombreCompleto,
            rut: dataUser.rut,
            email: dataUser.email
        });

        const userSaved = await userRepository.save(newUser);

        return userSaved;
    } catch (error) {
        console.error('Error al crear un usuario: ', error);
    }
}

export async function getUserService(id) {
    try {
        const userRepository = AppDataSource.getRepository(User);

        const userFound = await userRepository.findOne({
            where: { id }
        });

        if (!userFound) {
            return null;
        }

        return userFound;
    } catch (error) {
        console.error("Error al obtener el usuario:", error);
    }
}

export async function getUsersService() {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find();
        return users;
    } catch (error) {
        console.error('Error al obtener usuarios: ', error);
    }
}

export async function updateUserService(id, dataUser) {
    try {
        const userRepository = AppDataSource.getRepository(User);

        const userFound = await userRepository.findOne({ where: { id } });

        if (!userFound) {
            return null;
        }

        await userRepository.update(id, dataUser);

        const updatedUser = await userRepository.findOne({ where: {id } });
        return updatedUser;
    } catch (error) {
        console.error('Error al actualizar usuario: ', error);
    }
}

export async function deleteUserService(id) {
    try {
        const userRepository = AppDataSource.getRepository(User);

        const userFound = await userRepository.findOne({ where: { id } });

        if (!userFound) {
            return null;
        }

        const deletedUser = await userRepository.remove(userFound);
        return deletedUser;
    } catch (error) {
        console.error('Error al eliminar usuario: ', error);
    }
}