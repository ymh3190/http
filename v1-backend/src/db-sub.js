import { User, Token, Image, Video, Genre, Client, Product, Commodity, Tank, Item } from "./db.js";
(async () => {
User.table = User.getTable();
User.columns = await User.getColumns();
User.asColumns = User.toAsColumn();
User.dateFormat = User.formatDate();
User.enums = User.getEnums();
Token.table = Token.getTable();
Token.columns = await Token.getColumns();
Token.asColumns = Token.toAsColumn();
Token.dateFormat = Token.formatDate();
Token.enums = Token.getEnums();
Image.table = Image.getTable();
Image.columns = await Image.getColumns();
Image.asColumns = Image.toAsColumn();
Image.dateFormat = Image.formatDate();
Image.enums = Image.getEnums();
Video.table = Video.getTable();
Video.columns = await Video.getColumns();
Video.asColumns = Video.toAsColumn();
Video.dateFormat = Video.formatDate();
Video.enums = Video.getEnums();
Genre.table = Genre.getTable();
Genre.columns = await Genre.getColumns();
Genre.asColumns = Genre.toAsColumn();
Genre.dateFormat = Genre.formatDate();
Genre.enums = Genre.getEnums();
Client.table = Client.getTable();
Client.columns = await Client.getColumns();
Client.asColumns = Client.toAsColumn();
Client.dateFormat = Client.formatDate();
Client.enums = Client.getEnums();
Product.table = Product.getTable();
Product.columns = await Product.getColumns();
Product.asColumns = Product.toAsColumn();
Product.dateFormat = Product.formatDate();
Product.enums = Product.getEnums();
Commodity.table = Commodity.getTable();
Commodity.columns = await Commodity.getColumns();
Commodity.asColumns = Commodity.toAsColumn();
Commodity.dateFormat = Commodity.formatDate();
Commodity.enums = Commodity.getEnums();
Tank.table = Tank.getTable();
Tank.columns = await Tank.getColumns();
Tank.asColumns = Tank.toAsColumn();
Tank.dateFormat = Tank.formatDate();
Tank.enums = Tank.getEnums();
Item.table = Item.getTable();
Item.columns = await Item.getColumns();
Item.asColumns = Item.toAsColumn();
Item.dateFormat = Item.formatDate();
Item.enums = Item.getEnums();
})();