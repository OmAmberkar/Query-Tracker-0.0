import Ticket from '../models/ticket.model'

const ticketData = async (req,res) =>{
    const ticket = await Ticket.find();
    
}