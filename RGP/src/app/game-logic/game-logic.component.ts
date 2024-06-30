
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as Phaser from 'phaser';

@Component({
  selector: 'app-game-logic',
  standalone: true,
  imports: [],
  templateUrl: './game-logic.component.html',
  styleUrl: './game-logic.component.scss'
})

export class GameLogicComponent implements OnInit {
  @ViewChild('gameCanvas', { static: true }) gameCanvas!: ElementRef<HTMLCanvasElement>;
  game!: Phaser.Game;

  ngOnInit(): void {
    this.initializeGame();
  }

  initializeGame(): void {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.CANVAS,
      canvas: this.gameCanvas.nativeElement,
      width: 800,
      height: 600,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 , x: 0 },
          debug: false
        }
      },
      scene: GameScene // Verwendet die benutzerdefinierte Scene-Klasse
    };

    this.game = new Phaser.Game(config);
  }
}

// Erstelle eine benutzerdefinierte Scene-Klasse
class GameScene extends Phaser.Scene {
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  map!: Phaser.GameObjects.Image;

  constructor() {
    super({ key: 'GameScene' });
  }

  preload(): void {
    this.load.image('map', 'assets/map.png'); // Bilddatei laden
  }

  create(): void {
    // Füge das Bild zur Szene hinzu
    this.map = this.add.image(0, 0, 'map').setOrigin(0, 0);
    this.map.setScale(0.5); // Skaliere die Karte, wenn nötig
  
    // Initialisiere die Cursors
    this.cursors = this.input.keyboard?.createCursorKeys() as Phaser.Types.Input.Keyboard.CursorKeys;
  
    // Kamera-Konfiguration
    this.cameras.main.setBounds(0, 0, this.map.width, this.map.height);
    this.cameras.main.startFollow(new Phaser.Math.Vector2(400, 300)); // Setze den Startpunkt der Kamera
  }
  

  override update(): void {
    if (!this.cursors || !this.map) {
      return; // Sicherheitsüberprüfung, um sicherzustellen, dass `cursors` und `map` nicht `null` sind.
    }
  
    const speed = 5;
  
    if (this.cursors.left.isDown) {
      this.cameras.main.scrollX -= speed;
    }
    if (this.cursors.right.isDown) {
      this.cameras.main.scrollX += speed;
    }
    if (this.cursors.up.isDown) {
      this.cameras.main.scrollY -= speed;
    }
    if (this.cursors.down.isDown) {
      this.cameras.main.scrollY += speed;
    }
  }
  
}