# installation macOS using homebrew
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/
xcode-select --install
brew tap mongodb/brew
brew install mongodb-community@6.0
brew install mongodb-database-tools
brew services start mongodb-community@6.0
brew services stop mongodb-community@6.0





show dbs;
cls
use <db_name>
show collections;
db.courses.insertOne({name: "java", price: 10})
db.courses.find()
db.courses.find().pretty()
exit
db.dropDatabase();