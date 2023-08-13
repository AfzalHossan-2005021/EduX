import connectdb from "../../middleware/connectdb"

export default async function handler(req, res) {
	try {
		const result = await connectdb();
		res.status(200).json(result)
	} catch (err) {
		res.status(500).json({ error: 'failed to load data' })
	}
}