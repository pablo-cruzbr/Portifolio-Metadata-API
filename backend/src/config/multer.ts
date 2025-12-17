import multer from 'multer';

export default {
    upload() {
        return {
            // Mudamos de diskStorage para memoryStorage
            storage: multer.memoryStorage(),
        }
    }
}