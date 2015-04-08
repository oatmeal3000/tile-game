var Tile;
(function () {
  var North = new IVector(0, -1, 0);
  var South = new IVector(0, +1, 0);
  var East  = new IVector(+1, 0, 0);
  var West  = new IVector(-1, 0, 0);
  var Above = new IVector(0, 0, 1);

  function _Tile(name, props) {
    return {
      name: name,
      canOccupy: function () {
        return this.toString() === "Tile.Empty" || this.isTakeable() || this.isWater() ;
      },
      gem: function () { return props.gem; },
      gemToWall: props.gemToWall,
      isWater: function () { return props.water; },
      isShadowing: function () { return props.shadow; },
      isTakeable: function () { return this.gem() && true; },
      isPushable: function () { return props.pushable; },
      isRampFor: function (direction) {
        var d = props.rampdir;
        return d && d.equals(direction);
      },
      isFloodableFrom: function (direction) {
        return props.anyFloodable
               || (props.rampdir && !direction.equals(props.rampdir))
               || this.isTakeable();
      },
      toString: function () { return "Tile." + name; }
    };
  }

  Tile = {
    // Empty space to walk through
    Empty: _Tile("Empty", {anyFloodable:true,shadow:false}),

    // Plain walls/surfaces
    Block: _Tile("Block", {shadow:true}),
    Grass: _Tile("Grass", {shadow:true}),
    Dirt: _Tile("Dirt", {shadow:true}),

    // Miscellaneous collectables

    // Pushable blocks
    PushBlock: _Tile("PushBlock", {pushable:1,shadow:true}),

    // Ramps - can be moved onto but only from one direction
    RampN: _Tile("RampN", {rampdir: North,shadow:false}),
    RampE: _Tile("RampE", {rampdir: East,shadow:false}),
    RampS: _Tile("RampS", {rampdir: South,shadow:false}),
    RampW: _Tile("RampW", {rampdir: West,shadow:false}),

    RoofNorth: _Tile("RoofNorth", {rampdir: North,shadow:false}),
    RoofSouth: _Tile("RoofSouth", {rampdir: South,shadow:false}),
    RoofEast: _Tile("RoofEast", {rampdir: East,shadow:false}),
    RoofWest: _Tile("RoofWest", {rampdir: West,shadow:false}),
    RoofNorthEast: _Tile("RoofNorthEast", {rampdir: North.add(East),shadow:false}),
    RoofNorthWest: _Tile("RoofNorthWest", {rampdir: North.add(West),shadow:false}),
    RoofSouthEast: _Tile("RoofSouthEast", {rampdir: South.add(East),shadow:false}),
    RoofSouthWest: _Tile("RoofSouthWest", {rampdir: South.add(West),shadow:false}),
  

    // Flowing water
    WaterNew: _Tile("WaterNew", {water:1,shadow:false}),
    Water: _Tile("Water", {water:1,shadow:false}),

    // Acts like a block - can be stood on - but will disappear in water.
    Washout: _Tile("Washout", {anyFloodable:true}),

    // Gems - objects to collect
    Gem1: _Tile("Gem1", {gem:1,gemToWall:function () { return Tile.GemWall1; }}),
    Gem2: _Tile("Gem2", {gem:2,gemToWall:function () { return Tile.GemWall2; }}),
    Gem3: _Tile("Gem3", {gem:3,gemToWall:function () { return Tile.GemWall3; }}),

    // Gem walls disappear when the corresponding gems are picked up.
    GemWall1: _Tile("GemWall1", {shadow:true}),
    GemWall2: _Tile("GemWall2", {shadow:true}),
    GemWall3: _Tile("GemWall3", {shadow:true}),

    // The exit the player must reach to win
    Exit: _Tile("Exit", {}),

    // The player character, in various states
    Player: _Tile("Player", {anyFloodable:true,shadow:false}),
    PlayerWon: _Tile("PlayerWon", {anyFloodable:true,shadow:false})
  };  
})();
