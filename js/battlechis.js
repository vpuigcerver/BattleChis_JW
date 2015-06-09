var game = new Phaser.Game(
	916,
	916,
	Phaser.AUTO,'BattleChis');

game.state.add('boot', BootStrap);
game.state.add('controller', BoardController);


game.state.start('boot');