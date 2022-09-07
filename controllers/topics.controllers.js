const {selectTopics} = require('../modules/topics.modules')

exports.getTopics = (req, res) => {
    return selectTopics().then((topics)=> {
        
        res.status(200).send({topics});
        
        
    })
}

