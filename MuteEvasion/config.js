// config.js
import { @Vigilant, @TextProperty, @ColorProperty, @ButtonProperty, @SwitchProperty, @SliderProperty, @SelectorProperty, Color } from 'Vigilance';

@Vigilant("MuteEvade", "MuteEvade", {
    getCategoryComparator: () => (a, b) => {
        const categories = ["General", "Bot"]
        return categories.indexOf(a.name) - categories.indexOf(b.name)
    }
})
class Settings {
    @SwitchProperty({
        name: "Enabled",
        description: "Whether or not the module is enabled.",
        category: "General",
    })
    enabled = true;

    @TextProperty({
        name: "Port",
        description: "The port of the websocket server",
        category: "General",
        placeholder: "4325"
    })
    port = "4325";

    @TextProperty({
        name: "Host",
        description: "The host of the websocket server",
        category: "General",
        placeholder: "localhost"
    })
    host = "localhost";
    // Unused for now
    @SwitchProperty({
        name: "Dungeon Compatability",
        description: "When someone says something such as going, it will automatically leave the party and rejoin when it gets invited.",
        category: "Bot"
    })
    dungeonCompatability = true;

    constructor() {
        this.initialize(this);
        this.setCategoryDescription("General", "&dMuteEvasion Settings");
        this.setCategoryDescription("Bot", "&dBot settings.");
    }
}

export default new Settings();