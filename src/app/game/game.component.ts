import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  cells: any[] = [];
  players: any[] = [];
  currentPlayerIndex: number = 0;
  isGameOver: boolean = false;
  winner: string | null = null;

  ngOnInit(): void {
    // Initialize the game board and players
    this.cells = Array.from({ length: 100 }, (_, i) => ({ value: i + 1 }));
    this.players = [
      { name: 'Player 1', color: 'red', position: 0 },
      { name: 'Player 2', color: 'blue', position: 0 },
    ];
  }

  rollDice() {
    if (this.isGameOver) {
      return;
    }

    // Simulate dice roll and update player position
    const diceValue = Math.floor(Math.random() * 6) + 1;
    const currentPlayer = this.players[this.currentPlayerIndex];
    console.log(`Player ${currentPlayer.name} rolled a ${diceValue}.`);

    // Update player position
    currentPlayer.position += diceValue;

    console.log(`Player ${currentPlayer.name} moved to position ${currentPlayer.position}.`);

    // Handle snakes and ladders
    currentPlayer.position = this.handleSnakesAndLadders(currentPlayer.position);
    console.log(`Player ${currentPlayer.name} landed on position ${currentPlayer.position} after snakes and ladders.`);
    // Check for a winner
    if (currentPlayer.position >= this.cells.length) {
      this.isGameOver = true;
      this.winner = currentPlayer.name;
      console.log(`Player ${currentPlayer.name} wins!`);
    }

    // Switch to the next player
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
  }

  handleSnakesAndLadders(position: number): number {
    const snakesAndLadders: { [key: number]: number } = {
      14: 4, 19: 7, 22: 8, 24: 16,
      27: 1, 35: 5, 39: 3, 50: 11,
       3:60, 56:90, 23:78, 32:87
    };

    return snakesAndLadders[position] || position;
  }
}
