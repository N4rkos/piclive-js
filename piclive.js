/**
 * PicLiveViewer est un petit module javascript
 * permettant d'afficher une image d'une URL saisie dans une zone de texte en temps réel.
 *
 * @author Thomas Gouveia
 * @version 1.0
 * @see https://github.com/N4rkos/piclive-js
 */
class PicLiveViewer {

    /**
     * Évènement sur lequel se déclenche le chargement de
     * l'image.
     * Par défaut, lorsque l'on quitte un champ de texte.
     * @type {string}
     */
    ON_EVENT = "blur";

    /**
     * Identifiant par défaut des viewers.
     * @type {string}
     */
    static VIEWER_ID = "#piclive-viewer";

    /**
     * Identifiant par défaut des inputs.
     * @type {string}
     */
    static INPUT_ID = "#piclive-input";

    /**
     * Attribut par défaut permettant de mettre en relation
     * l'input et son viewer associé.
     * @type {string}
     */
    LINK_ATTRIBUTE = "piclive-tag";

    /**
     * Attribut des liens permettant d'insérer l'URL.
     * @type {string}
     */
    SRC_ATTRIBUTE = "src";

    /**
     * Expression régulière permettant de tester si l'URL fournie est bien une URL.
     * @type {string}
     */
    URL_VALIDATION_REGEX = "^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&'\\(\\)\\*\\+,;=.]+$";

    /**
     * Cherche dans le document tous les piclive-input et tous les piclive-viewer.
     * À partir de ces résultats, un objet de type PicLiveViewer est créé et son constructeur
     * s'occupe de lier entre eux les différents inputs/viewers.
     */
    static init() {
        let inputs = document.querySelectorAll(PicLiveViewer.INPUT_ID);
        let viewers = document.querySelectorAll(PicLiveViewer.VIEWER_ID);
        let piclive = new PicLiveViewer(inputs, viewers);
    }

    /**
     * Constuit un viewer avec les inputs et viewers passés en paramètre.
     * @param {NodeList} inputs liste contenant les différents inputs.
     * @param {NodeList} viewers liste contenant les différents viewers.
     */
    constructor(inputs, viewers) {
        this.inputs = inputs;
        this.viewers = viewers;
        this.regexTester = RegExp(this.URL_VALIDATION_REGEX);
        //Bind methods
        this.loadImage = this.loadImage.bind(this);
        //Ajoute le listener sur chacun des inputs.
        this.inputs.forEach(item => item.addEventListener(this.ON_EVENT, this.loadImage));
    }

    /**
     * Charge l'image depuis l'URL.
     * Une erreur survient si la longueur de la chaine est de 0 ou si l'URL est mal formatée.
     * @param {Event} e évènement déclenché par le listener.
     */
    loadImage(e) {
        //On récupère l'émetteur de l'évènement, l'input.
        let input = e.target;
        //On récupère sa valeur
        let url = input.value;
        //On passe des tests dessus
        if (url.length === 0 || !this.regexTester.test(url))
            console.error('PICLIVE_ERROR : L\'url saisie est vide ou n\'est pas valide.');
        //Récupération du tag
        let tag = input.getAttribute(this.LINK_ATTRIBUTE);
        //On cherche le viewer associé
        let viewer = this.findViewerByTag(tag);
        if (viewer === null) console.log('PICLIVE_ERROR : No viewer for this tag..');
        //Enfin, on met l'URL dans l'attribut SRC de l'image.
        viewer.setAttribute(this.SRC_ATTRIBUTE, url);
    }

    /**
     * Recherche le viewer ayant le tag passé en paramètre.
     * @param {string} tag du viewer
     * @returns {Node|null} un élément si trouvé, null sinon.
     */
    findViewerByTag(tag) {
        for (let i = 0; i < this.viewers.length; i++) {
            let viewer = this.viewers.item(i);
            if (viewer.getAttribute(this.LINK_ATTRIBUTE) === tag) {
                return viewer;
            }
        }
        return null;
    }

}

//Initialisation du viewer.
PicLiveViewer.init();