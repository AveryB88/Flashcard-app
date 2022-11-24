import React from "react"; 
import { useState, useEffect } from "react";
import { listDecks } from "../utils/api";
import { useHistory } from "react-router-dom";
import DeckDelete from "../Delete/DeckDelete";

export default function DeckList() {
    const [decks, setDecks] = useState([]);
    const history = useHistory();
  
    useEffect(() => {
      const deckAbort = new AbortController();
      async function deckList() {
        try {
          const list = await listDecks(deckAbort.signal);
          console.log("list is ", list);
          setDecks(list);
        }
        catch (error) {
          console.log("error creating deck list");
        }
        return () => {
          deckAbort.abort();
        }
      }
      deckList();
    }, [])

    const printList = decks.map((deck) => {
        return (
          <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{deck.name}
              <p className="card-text"><small className="text-muted float-right" >{deck.cards.length} cards</small></p>
            </h5>
            <br></br>
              <p className="card-text">{deck.description}</p>
            <button type="button" className="btn btn-secondary mr-2 mt-2" onClick={() => history.push(`/decks/${deck.id}`)}>View</button>
            <button type="button" className="btn btn-primary mt-2" onClick={() => history.push(`/decks/${deck.id}/study`)}>Study</button>
            <DeckDelete deckId={deck.id} />
          </div>
        </div>
        )    
    })

    return (
        <div classNmae='decks'>
            {printList}
        </div>
    )
}