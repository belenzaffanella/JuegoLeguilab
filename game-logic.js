/* Reglas simples y comprobables de una ronda de un solo producto. */
window.LEGUILAB_LOGIC = (()=>{
  function shuffle(items,random=Math.random){const result=items.slice();for(let i=result.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[result[i],result[j]]=[result[j],result[i]]}return result}
  function createRound(data,productId,playerName,random=Math.random){
    const product=data.products.find(p=>p.id===productId),questions=data.questions[productId];
    if(!product||!questions||questions.length<5)throw new Error('Producto o banco de preguntas incompleto');
    return {product,playerName,deck:[questions[0],...shuffle(questions.slice(1),random)],index:0,score:0,correct:0,responses:[],answered:false};
  }
  function submit(round,isCorrect,data){if(!round||round.answered)return false;round.answered=true;const points=isCorrect?data.pointsPerCorrect:0;round.score+=points;if(isCorrect)round.correct++;round.responses.push({questionId:round.deck[round.index].id,correct:isCorrect,points});return true}
  function next(round){if(!round||!round.answered||round.index>=round.deck.length-1)return false;round.index++;round.answered=false;return true}
  function wonPrize(round,data){return Boolean(round)&&round.index===round.deck.length-1&&round.answered&&round.score>=data.prizeThreshold}
  return {shuffle,createRound,submit,next,wonPrize};
})();
