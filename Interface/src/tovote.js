/* globals localStorage */

// FEATURE 13. Provide default values
const STORAGE_KEY = 'tovoteListFei'

// FEATURE 2. Add a part
class Party {
  constructor (newName, newVote) {
    this.name = newName
    this.vote = newVote // FEATURE 13. Provide default values
  }

}

// FEATURE 1. Create a whole that acts as a Facade for parts
class ToVoteList {
	constructor () {
    this.allMyParties = []
    this.editedItem = null
    this.editedPartyIndex = null
    this.beforeEditTitleCache = ''
    this.partyCount = 0
	}
  
	// FEATURE 15. Get all parts
	getAllParties () {
		return this.allMyParties
	}
  
	// FEATURE 12. A calculation across many parts
	// FEATURE 4. Filter parts
	getVotedParties () {
		return this.allMyParties.filter(party => party.vote > 0)
	} 
 

  
    // FEATURE 7. Load all parts from LocalStorage
	load () {
    // FEATURE 13. Provide default values
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
	}
	
	//  FEATURE 6. Save all parts to LocalStorage
	save () {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.allMyParties))
	}
	
	// FEATURE 2. Add a part
	addParty(newName, newVote) {
        newName = newName.trim()
        if (!newName) {
			return
		}

		const aNewParty = new Party(newName, newVote)
		this.allMyParties.push(aNewParty)
        this.partyCount += 1
   
	}
	
	// FEATURE 12. A calculation across many parts
	remaining () {
		return this.getVotedParties().length
	}
	
	// FEATURE 12. A calculation across many parts
	getAllDone () {
		return this.remaining() === 0
	}
	

	
	// FEATURE 5. Delete a selected part
	removeParty (targetPartyName) {
    const index = this.allMyParties.findIndex(party => party.name === targetPartyName)
    this.allMyParties.splice(index, 1)
	}
	
	// FEATURE 8. Update/edit a part
	startEditing (party) {
		this.beforeEditCache = party.name
		this.editedName = party
	}
	
	// FEATURE 8. Update/edit a part
	doneEditing (party) {
		// FEATURE 10. Validate inputs
		if (!party) {
			return
		}
		this.editedParty = null
		party.name = party.name.trim()
		if (!party.name) {
			this.removeParty(party)
		}
	}
	
	// FEATURE 9. Discard /revert edits to a part
	cancelEditing (party) {
		this.editedParty = null
		party.name = this.beforeEditCache
	}
	
	// FEATURE 5. Delete a selected part
	removeVoted () {
		this.allMyParties = this.getVotedParties()
	}
	
	// FEATURE 3. Sort parts
	sortParties () {
		this.allMyParties.sort(function (a, b) {
			if (a.name < b.name) {
				return -1
			}
			if (a.name > b.name) {
				return 1
			}
			return 0
		})
	}
    
    sortPartiesByVote () {
        this.allMyParties.sort((a, b) => {
            if (a.vote < b.vote) {
				return -1
			}
			if (a.vote > b.vote) {
				return 1
			}
			return 0
        })
    }

	
	// FEATURE 14. Find a part given a search criterion
	findParty (targetName) {
		return this.allMyParties.find((party) => party.name === targetName)
	}
	
}