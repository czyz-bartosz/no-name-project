import { Response } from "express";
import League from "../../models/League.js";
import { RequestWithJwtPayload } from "../../middlewares/index.js";
import TeamLeague from "../../models/TeamLeague.js";
import Match from "../../models/Match.js";



// // Update a league
// export const updateLeague = async (req: Request, res: Response) => {
//     try {
//         const [updated] = await League.update(req.body, {
//             where: { id: req.params.id },
//         });
//         if (updated) {
//             const updatedLeague = await League.findByPk(req.params.id);
//             res.status(200).json(updatedLeague);
//         } else {
//             res.status(404).json({ error: "League not found" });
//         }
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// // Delete a league
// export const deleteLeague = async (req: Request, res: Response) => {
//     try {
//         const deleted = await League.destroy({
//             where: { id: req.params.id },
//         });
//         if (deleted) {
//             res.status(204).send();
//         } else {
//             res.status(404).json({ error: "League not found" });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
