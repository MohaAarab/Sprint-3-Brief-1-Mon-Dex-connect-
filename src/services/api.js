
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
      type: card.type ?? "Non applicable",
      level:card.level ?? 0,
      stats: {
          attack: card.atk ?? 0,
          defence: card.def ?? 0
          },
      image: card.card_images[0].image_url,
      description:card.desc
      }
 
}


export async  function getCreatures(){
    const cards=await getCard()

    return cards.map(card => toCreature(card) )

}

export async function searchCards(name) {
        const URL = `https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${encodeURIComponent(name)}`;
         try{
            
            const response=await fetch(URL)

            if(!response.ok){
                if(response.status === 400) return []
                throw new Error ("HTTP error: " + response.status)
            }
            
            const data= await response.json();
            
            return data.data.map(card => toCreature(card));


            
        }catch(error){
            throw error
        }

} 



export function resetPagination(){
    offset=18
}