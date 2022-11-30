// config.js
import { @Vigilant, @TextProperty, @ColorProperty, @ButtonProperty, @SwitchProperty, @SliderProperty, @SelectorProperty, Color } from 'Vigilance';

@Vigilant("MuteEvade", "MuteEvade", {
    getCategoryComparator: () => (a, b) => {
        const categories = ["General"]
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

    constructor() {
        this.initialize(this);
        this.setCategoryDescription("General", "MuteEvasion Settings");
    }
}

export default new Settings();