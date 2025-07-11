import { Game } from "../core/Game";

export class UIManager {
    private scoreElement: HTMLElement;
    private highScoreElement: HTMLElement;
    private levelElement: HTMLElement;
    private startButton: HTMLButtonElement;
    private gameOverElement: HTMLElement;

    constructor(game: Game) {
        this.scoreElement = document.getElementById("score")!;
        this.highScoreElement = document.getElementById("highScore")!;
        this.levelElement = document.getElementById("level")!;
        this.startButton = document.getElementById("startButton") as HTMLButtonElement;
        this.gameOverElement = document.getElementById("gameOver")!;

        this.startButton.addEventListener("click", () => {
            game.start();
            this.hideGameOver();
            this.startButton.style.display = "none";
        });
    }

    public updateScore(score: number): void {
        this.scoreElement.innerText = `Score: ${score}`;
    }

    public updateHighScore(highScore: number): void {
        this.highScoreElement.innerText = `High Score: ${highScore}`;
    }

    public updateLevel(level: number): void {
        this.levelElement.innerText = `Level: ${level}`;
    }

    public showGameOver(): void {
        this.gameOverElement.style.display = "block";
    }

    public hideGameOver(): void {
        this.gameOverElement.style.display = "none";
    }

    public showStartButton(): void {
        this.startButton.style.display = "block";
    }
}