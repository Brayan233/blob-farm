import { Request, Response } from "express";
import router from "./router";
import database from "../database";

router.route('/blobs')
    .get((req: Request, res: Response) => {
        // Return blob list
        const blobs = database.list();
        res.json({ blobs });
    })
    .post((req: Request, res: Response) => {
        // TODO: Create new blob
        const blob = req.body
        database.add(blob);
        res.json({ "message": "Blob succesfully added" });

    });

router.route('/blobs/:id')
    .get((req: Request, res: Response) => {
        const blob = database.get(req.params.id);
        res.json(blob);
    })
    .put((req: Request, res: Response) => {
        const blob = req.body
        database.update(blob);
        res.json({ "message": "Blob succesfully updated" });
    })
    .delete((req: Request, res: Response) => {
        const id = req.params.id
        database.remove(id);
        res.json({ "message": "Blob succesfully removed" });
    });

export default router;
