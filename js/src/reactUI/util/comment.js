define(function (require, exports) {
    var $ = require('jquery');
    var React = require('react');
    var chromeUtil = require('chromeUtil').chromeLocalStorage;

    //UI Module
    var CommentRowBox = React.createClass({
        handleSave: function () {
            var team = this.props.team;
            var id = this.props.rows.id;

            var smartkey = React.findDOMNode(this.refs.smartkey);
            var description = React.findDOMNode(this.refs.description);
            var cc_obj = {
                id: id,
                key: $(smartkey).val(),
                des: $(description).val(),
                template: ''
            };

            chromeUtil.getLocalStorage(team + '_obj', function (result) {
                var custom_obj = result[team + '_obj'];
                cc_obj.template = custom_obj[id].template;
                custom_obj[id] = cc_obj;

                var temp = {};
                temp[team + '_obj'] = custom_obj;

                chromeUtil.setLocalStorage(temp, function () {
                    console.log("Change %s obj to %o successfully.", team, cc_obj);
                });
            });
        },

        handleMore: function () {
            window.open("/options.html?id=" + this.props.rows.id + "&team=" + this.props.team);
        },

        render: function () {
            return (
                <tr>
                    <td>
                        <input id={this.props.rows.id+'_key'} type="text" className="table_input one_input"
                               placeholder="smartkey" ref='smartkey' defaultValue={this.props.rows.key}/>
                    </td>
                    <td>
                        <input id={this.props.rows.id+'_d'} type="text" className="table_input two_input"
                               placeholder="description" ref='description' defaultValue={this.props.rows.des}/>
                    </td>
                    <td>
                        <button type="button" value="save" className=" three_input btn btn-default btn-xs"
                                onClick={this.handleSave}>Save
                        </button>
                        <button type="button" value="more" className=" three_input btn btn-info btn-xs"
                                onClick={this.handleMore}>More
                        </button>
                    </td>
                </tr>
            )
        }
    });

    exports.CommentBox = function (team,rows) {
        var CommentRows = [];

        rows.forEach(function (c,i) {
            CommentRows.push(<CommentRowBox key={i} rows={c} team={team}/>);
        });

        return (
            <div>
                <table id="fp_basic" className="table table-striped table-condensed">
                    <tbody>
                    <tr>
                        <th className="one">Smart Key</th>
                        <th className="two">Description</th>
                        <th className="three">To Do</th>
                    </tr>
                    {CommentRows}
                    </tbody>
                </table>
            </div>
        )
    };
});

