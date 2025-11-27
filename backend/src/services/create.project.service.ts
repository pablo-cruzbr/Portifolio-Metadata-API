import prismaClient from "../prisma/index.js";

interface ProjectRequest{
    title: string;
    technologies: string;
    goal: string;
    features: string;
}

class CreateProjectService{
    async execute(data: ProjectRequest){
        const { title, technologies, goal, features } = data; 

        if (title === ''){
            throw new Error('Name Invalid'); 
        }
        const produtoExistente = await prismaClient.project.findFirst({
            where:{
                title: title
            }
        })
        const project = prismaClient.project.create({
            data:{
                 title: title,
                 technologies: technologies,
                 goal: goal,
                 features: features
            },

            select:{
                id: true,
                title: true,
                technologies: true,
                goal: true,
                features: true
            }
        })
        return project
    }
}

export {CreateProjectService}