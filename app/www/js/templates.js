this["templates"] = this["templates"] || {};

this["templates"]["home"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div id=\"welcome\">Welcome! Please Login!</div><br><br><button id=\"get-all-transactions\">Get All Transactions</button><br><br><button id=\"create-transaction\">Create Transaction</button><br><br><button id=\"add-transaction\">Add Transaction</button><br><br>";
},"useData":true});

this["templates"]["transaction"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div><div><label>Account Number:</label>"
    + alias3(((helper = (helper = helpers.accountNumber || (depth0 != null ? depth0.accountNumber : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"accountNumber","hash":{},"data":data}) : helper)))
    + "</div><div><label>Payee:</label>"
    + alias3(((helper = (helper = helpers.payee || (depth0 != null ? depth0.payee : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"payee","hash":{},"data":data}) : helper)))
    + "</div><div><label>Description:</label>"
    + alias3(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"description","hash":{},"data":data}) : helper)))
    + "</div><div><label>Tax Item:</label>"
    + alias3(((helper = (helper = helpers.taxItem || (depth0 != null ? depth0.taxItem : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"taxItem","hash":{},"data":data}) : helper)))
    + "</div><div><label>Amount:</label>"
    + alias3(((helper = (helper = helpers.amount || (depth0 != null ? depth0.amount : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"amount","hash":{},"data":data}) : helper)))
    + "</div></div>";
},"useData":true});

this["templates"]["transactions"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<tr><td>"
    + alias3(((helper = (helper = helpers.accountNumber || (depth0 != null ? depth0.accountNumber : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"accountNumber","hash":{},"data":data}) : helper)))
    + "</td><td>"
    + alias3(((helper = (helper = helpers.payee || (depth0 != null ? depth0.payee : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"payee","hash":{},"data":data}) : helper)))
    + "</td><td>"
    + alias3(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"description","hash":{},"data":data}) : helper)))
    + "</td><td>"
    + alias3(((helper = (helper = helpers.taxItem || (depth0 != null ? depth0.taxItem : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"taxItem","hash":{},"data":data}) : helper)))
    + "</td><td>"
    + alias3(((helper = (helper = helpers.amount || (depth0 != null ? depth0.amount : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"amount","hash":{},"data":data}) : helper)))
    + "</td></tr>";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<table class=\"table table-bordered\"><tr><td>Account #</td><td>Payee</td><td>Description</td><td>Tax Item</td><td>Amount</td></tr>"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.transactions : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</table>";
},"useData":true});