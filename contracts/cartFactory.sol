pragma solidity >=0.8.2 <0.9.0;

contract CartFactory {

  struct Order {
    string status;
    bool complete;
    uint[] items;
    uint256 total;
    address customer;
    address storeWallet;
    address budTender;
  }

  // store orders
  mapping (uint => Order) public orders;
  // Create a counter to keep track of order IDs
  uint public orderCount;


  function addOrder(string memory _status, bool _complete, uint[] memory _items, uint256 _total, address _customer, address _storeWallet, address _budTender) public {
    Order memory newOrder = Order(_status, _complete, _items, _total, _customer, _storeWallet, _budtender);

    // add new order to mapping
    orders[orderCount] = newOrder;

    orderCount++;

  }

  function getOrder(uint _orderid) public view returns (string memory,bool, uint[] memory, uint256, address, address, address) {
    Order memory order = orders[_orderId];

    return (order.status, order.complete, order.items, order.total, order.customer, order,storeWallet, order.budTender);
  }
}
