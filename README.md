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


### Installation for the Project

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo




## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [something](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [someother](https://maven.apache.org/) - Dependency Management
* [another](https://rometools.github.io/rome/) - Used to generate RSS Feeds


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
