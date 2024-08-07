import { Request, Response } from 'express';
import { usersDto } from './users.dto';
import * as bcrypt from 'bcrypt';
import prisma from '../../database/database';
 

const createUser = async (req: Request, res: Response) =>{
 try {
  const {name, email, password } : usersDto = req.body

 if(!name || !email || !password){
  return res.status(401).json({message:'Todos os campos devem ser preenchidos'});
 }

 const hashedPassword = await bcrypt.hash(password, 10);

 const newUser = await prisma.user.create({
  data: {
    name,
    email,
    password: hashedPassword,
    createdAt: new Date() 
   }})


  return res.status(201).json(newUser)

 } catch (error) {
  return res.status(500).json({ error: "Erro interno do servidor"})
 }
}

export default {
  createUser
}