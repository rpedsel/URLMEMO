# URL MEMO Sharing Service

~~Illustration and link here~~

~~One Paragraph of project description MERN stack + Redis goes here~~


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites & Preparation

#### [MongoDB](https://www.mongodb.com) 
MongoDB is applied to store MEMO messages & URL received (also the shortened URLs to individual MEMO pages). I am running on Ubuntu so the installation would be something like this:

```bash
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
sudo apt-get update
sudo apt-get install -y mongodb-org
```
Some operations:
```bash
# to start
sudo systemctl start mongod
# to check status
sudo systemctl status mongod
# to stop
sudo systemctl stop mongod
```
*P.S* I met some issue when I installed with another installation guide (which require you to **mkdir -p /data/db**, if you met any problem [this](https://wesleytsai.io/2015/07/26/mongodb-server-directory-permission-denied/) may help.) 

Then we need to prepare the database for the project:
```bash
# getting into the mongo console
mongo
# inside mongo console
> use url_shortener
> db.counters.insert({ _id: 'url_count', seq: 1 })
> exit
```
#### [Redis](https://redis.io)

The application caches recently stored / accessed data using Redis. To install:
```bash
wget http://download.redis.io/redis-stable.tar.gz
tar xvzf redis-stable.tar.gz
cd redis-stable
make
# run test
make test
# copy both the Redis server and the command line interface in proper places
sudo make install
```
[(Redis Quick Start)](https://redis.io/topics/quickstart)

*P.S.* When I am moving the project onto AWS (EC2 Ubuntu Instance), I met some error running **make** when installing Redis (error wrt "jemalloc"), running **make MALLOC=libc** instead solved the problem for me.

### Installation for the Project

First clone a copy of this project onto your machine.

```bash
git clone https://github.com/rpedsel/URLMEMO.git
```

I am using **yarn** so you might need to have it installed:
```bash
npm i yarn
```
Then enter the project directory and install packages

```bash
cd URLMEMO
yarn # or npm install
# install cleint side create-react-app
cd client 
## To becontinued ##
```
#(((TO BE CONTINUED)))
