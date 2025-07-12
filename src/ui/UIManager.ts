import { Game } from "../core/Game";
import { Renderer } from "../graphics/Renderer";

export class UIManager {
    private scoreElement: HTMLElement;
    private highScoreElement: HTMLElement;
    private levelElement: HTMLElement;
    private startButton: HTMLButtonElement;
    private gameOverElement: HTMLElement;
    private backgroundImageInput: HTMLInputElement;
    private backgroundPreview: HTMLImageElement;
    private tetrominoSkinSelect: HTMLSelectElement; // Add new property
    private renderer: Renderer; // Add renderer property
    private mainMenuElement: HTMLElement; // Add mainMenuElement

    constructor(game: Game, renderer: Renderer) {
        this.scoreElement = document.getElementById("score")!;
        this.highScoreElement = document.getElementById("highScore")!;
        this.levelElement = document.getElementById("level")!;
        this.startButton = document.getElementById("startButton") as HTMLButtonElement;
        this.gameOverElement = document.getElementById("gameOver")!;
        this.backgroundImageInput = document.getElementById("backgroundImageInput") as HTMLInputElement;
        this.backgroundPreview = document.getElementById("backgroundPreview") as HTMLImageElement;
        this.tetrominoSkinSelect = document.getElementById("tetrominoSkinSelect") as HTMLSelectElement; // Get new element
        this.renderer = renderer; // Assign renderer
        this.mainMenuElement = document.getElementById("mainMenu")!; // Get mainMenuElement

        this.startButton.addEventListener("click", () => {
            game.start();
            this.hideGameOver();
            this.hideMainMenu(); // Hide main menu on game start
        });

        this.backgroundImageInput.addEventListener("change", (event) => {
            const file = (event.target as HTMLInputElement).files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const imageUrl = e.target?.result as string;
                    this.backgroundPreview.src = imageUrl;
                    this.backgroundPreview.style.display = "block";
                    this.renderer.setBackgroundImage(imageUrl); // Pass image URL to renderer
                };
                reader.readAsDataURL(file);
            } else {
                this.backgroundPreview.src = "";
                this.backgroundPreview.style.display = "none";
                this.renderer.setBackgroundImage(null); // Clear background image
            }
        });

        this.tetrominoSkinSelect.addEventListener("change", (event) => {
            const selectedSkin = (event.target as HTMLSelectElement).value;
            game.setTetrominoSkin(selectedSkin); // Call a new method in Game.ts
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
        // This button is now part of the main menu, so its display is handled by showMainMenu/hideMainMenu
    }

    public showMainMenu(): void {
        this.mainMenuElement.style.display = "flex"; // Use flex to center content
        document.getElementById("game-container")!.style.display = "none"; // Hide game container
    }

    public hideMainMenu(): void {
        this.mainMenuElement.style.display = "none";
        document.getElementById("game-container")!.style.display = "flex"; // Show game container
    }
}