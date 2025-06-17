import { Router } from 'express';
import { 
    createRol, 
    getAllRoles, 
    updateRol, 
    deleteRol 
} from '../controller/rol.controller';

const router = Router();

router.post('/', createRol);
router.get('/', getAllRoles);
router.put('/:id', updateRol);
router.delete('/:id', deleteRol);

export default router;