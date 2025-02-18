import Ticket from '../models/ticket.model.js'

const ticketData = async (req,res) =>{
    const { name,grpno,email,subject,description } = req.body;
    try{
        if(!name || !grpno || !email || !subject || !description){
            return res.status(400).json({message: "Please fill all the fields"})
        }
        const ticketDetails = new Ticket({
            name,
            grpno,
            email,
            subject,
            description,
        })
        await ticketDetails.save();
        res.status(201).json({ message: "Ticket generated successfully", ticketDetails });
    }
    catch(error){
        res.status(500).json({ message: "Something went wrong" });
    }
    
}

export { ticketData };