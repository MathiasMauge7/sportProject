import { Request, Response } from 'express';
import { ClientRepository } from '../../../repositories/ClientRepository';
import { response } from '../../../../utils/response';

const clientRepo = new ClientRepository();

export const register = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        
        if (!name?.trim())
            return response(res, { statusCode: 400, message: 'Invalid name' });

        // Vérification de l'unicité du nom d'utilisateur saisit
        const existingName = await clientRepo.getClientByName(name);
        if (existingName)
            return response(res, { statusCode: 409, message: 'Username already exists' });

        response(res, {statusCode: 201, message: 'User created successfully'});
    } catch(error) {
        console.error(error);
        response(res, {statusCode: 500, message: 'Internal server error'})
    } 
}