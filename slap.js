const player = require("node-wav-player");

const damageRange = [15, 20];
const critChance = 28;
const critMultiplier = 2;

const random = (min, max) => {
  return min + Math.floor(Math.random() * (max - min + 1));
};

const getSlap = () => {
  const isCrit = random(0, 100) <= critChance;

  const damage = random(...damageRange) * (isCrit ? critMultiplier : 1);

  return { isCrit, damage };
};

const actionTime = (timeMs = 0) =>
  new Promise((resolve) => setTimeout(resolve, timeMs));

module.exports = async (slapReceiver = console.log) => {
  const slap = getSlap();

  try {
    player.play({
      path: `./sounds/${slap.isCrit ? "slap-crit" : "slap"}.wav`,
    });
  } catch (error) {}

  await actionTime(1000);

  if (slap.isCrit) {
    slapReceiver("Critical hit!");

    await actionTime(1000);
  }

  slapReceiver(`You have been slapped for ${slap.damage} damage!`);
};
