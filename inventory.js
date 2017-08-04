var inventory;

(function() {
  inventory = {
    serial: 0,
    newOrder: function() {
      var id = this.serial++;
      return {
        id: id,
        name: '',
        stock: '',
        quantity: 1,
      };
    },
    collection: [],
    setDate: function() {
      var date = new Date();
      $('#order_date').text(date.toUTCString());
    },
    getTemplate: function() {
      var temp = $('#inventory_item').remove();
      this.template = temp.html();
    },
    addOrder: function(e) { 
      e.preventDefault();
      var $order = $(this.template.replace(/ID/g, this.serial));
      $('#inventory').prepend($order);
      this.collection.push(this.newOrder());
    },
    updateOrder: function(e) { 
      var content = $(e.target).val();
      var field = $(e.target).attr('name');
      var idNum = +field.replace(/[^\d]/g, '');
      this.getOrder(idNum, function(order) {
                             Object.keys(order).forEach(function(catagory) {
                               if (field.includes(catagory)) { order[catagory] = content }
                             });
                           }.bind(this));
    },
    getOrder: function(id, func) {
      this.collection.forEach(function(order, idx) {
        if (order['id'] === id) { func(order, idx) }
      });
    },
    deleteOrder: function(e) {
      e.preventDefault();
      var $tableRow = $(e.target).closest('tr').remove();
      var id = +$tableRow.find('input[type=hidden]').val();
      var index;
      this.getOrder(id, function(_, idx) { index = idx });
      this.collection.splice(index, 1);
    },
    bindEvents: function() {
      $('#add_item').click(this.addOrder.bind(this));
      $('form').on('blur', 'input', this.updateOrder.bind(this));
      $(document).on('click', '.delete', this.deleteOrder.bind(this));
    },
    init: function() {
      this.setDate();
      this.getTemplate();
      this.bindEvents();
    },
  };
})();

$(inventory.init.bind(inventory));

