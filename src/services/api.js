
let limit=20;
let offset=18

async function getCard() {
    const url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?num=${limit}&offset=${offset}`;

    try{
            const response=await fetch(url)
            
            if(!response.ok){
                throw new Error ("HTTP error: " + response.status)
            }
            
            const data= await response.json();
            
            offset+= limit;
            return data.data
            
        }catch(error){
            throw error
        }
        
}



function toCreature(card){

return{
    id: card.id,
    name: card.name,
    type: card.type,
    level:card.level ?? 0,
    stats: {
        attack: card.atk ?? 0,
        defense: card.def ?? 0
        },
    image: card.card_images[0].image_url,
    description:card.desc
    }
 
}


export async  function getCreatures(){
    const cards=await getCard()

    return cards.map(card => toCreature(card) )

}

