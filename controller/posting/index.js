const Posting = require('../../models/blog/posting');

const postingApi = () => {
    const insertPosting = async (decoded, _data) => {
        try {
            const title = _data.title;
            const user_name = decoded.name;
            const user_id = decoded._id;
            const category = _data.category;
            const contents = _data.contents;

            const data = await Posting.create(title,user_name,user_id,category,contents);
            return data;
        } catch (e) {
            console.log(e);
            return {error:e.message};
        }
    }

    return{
        insertPosting:insertPosting,
    }
}

module.exports = postingApi();