import * as mqtt from "mqtt";

const client: any = mqtt.connect("mqtt://mqtt.goodgoodgood.co.za:1883/banner", {
  username: `banner`,
  password: `93paEtwNqcgM9q`,
});

client.on("error", (err: any) => {
  console.log("Connection error: ", err);
  client.end();
});

client.on("reconnect", () => {
  console.log("Reconnecting...");
});

const colorConverter: any = (text: any) => {
  text = text.toString();
  if (text.length == 1) {
    return "00" + text;
  } else if (text.length == 2) {
    return "0" + text;
  }
  return text;
};

const speedConverter: any = (speed: any) => {
  speed = Math.floor(speed);
  speed = speed.toString();
  if (speed.length == 1) {
    return "0" + speed;
  }
  return speed;
};

const handler = async (req: any, res: any) => {
  try {
    switch (req.method) {
      case "POST":
        const { text, color, background, speed } = req.body;

        let message = text.toUpperCase();
        message += " " + colorConverter(color.g);
        message += colorConverter(color.r);
        message += colorConverter(color.b);
        message += colorConverter(background.g);
        message += colorConverter(background.r);
        message += colorConverter(background.b);
        message += speedConverter(speed);

        client.publish("banner", message, (success: any, error: any) => {
          if (!error) {
            res.status(200).json({});
          } else {
            res.status(300).json({});
          }
        });

      default:
        res.status(200).json();
        break;
    }
  } catch (error) {
    res.status(300).json();
  }
};

export default handler;
