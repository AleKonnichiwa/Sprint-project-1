class Products {
    constructor( id, name, description, price, photoUrl) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.photoUrl = photoUrl;
    }
}

let arrayProducts = [ new Products (1, 'Bagel de Salmón' , 'Salmón ahumado con queso crema y alcaparras en pan bagel', 425, 'https://placeralplato.com/files/2016/07/Bagels-de-salmn-e1468696119574.jpg'),
                        new Products (2, 'Hamburguesa Clásica' , 'Medallón de carne con feta de queso cheddar', 350, 'https://cocinarrecetasdepostres.net/wp-content/uploads/2021/01/1609613230_967_Receta-clasica-de-hamburguesa.jpg'),
                        new Products (3, 'Ensalada Veggie' , 'Tomate, Albahaca, Zanahoria, Remolacha', 340, 'https://img-global.cpcdn.com/recipes/d066590a1d09605f/751x532cq70/ensalada-detox-veggie-foto-principal.jpg') ];


console.log('Informacion de productos cargada');
module.exports = { arrayProducts };