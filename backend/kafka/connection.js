const kafka = require('kafka-node');

function ConnectionProvider() {
  this.getConsumer = function (topic_name) {
    // if (!this.kafkaConsumerConnection) {

  
    this.client = new kafka.KafkaClient(
      {kafkaHost:process.env.KAFKA_URL}
      // {kafkaHost:'54.196.13.220:9092'}
   
      );
   
    this.kafkaConsumerConnection = new kafka.Consumer(this.client, [{ topic: topic_name, partition: 0 }]);
    this.client.on('ready', () => { console.log('client ready!'); });
    // }
    return this.kafkaConsumerConnection;
  };

  // Code will be executed when we start Producer
  this.getProducer = function () {
    if (!this.kafkaProducerConnection) {
      this.client = new kafka.KafkaClient(
         {kafkaHost: process.env.KAFKA_URL}
        // {kafkaHost:'54.196.13.220:9092'}
        );
    
      const { HighLevelProducer } = kafka;

      this.kafkaProducerConnection = new HighLevelProducer(this.client);
      
      console.log('producer ready');
    }
    return this.kafkaProducerConnection;
  };
}
module.exports = new ConnectionProvider();
