INSERT INTO users (name, email, password, role) VALUES
('C_Alice', 'alice@school.ca', 'pass123', 'CUSTOMER'),
('E_Bob', 'bob@school.ca', 'pass123', 'EMPLOYEE'),
('M_Carol', 'carol@school.ca', 'pass123', 'MANAGER');

INSERT INTO menu_item (name, category, price, quantity, available, description) VALUES
('Coffee', 'Drinks', 2.50, 100, true, 'Hot brewed coffee'),
('Bagel', 'Food', 3.00, 50, true, 'Plain bagel with butter'),
('Orange Juice', 'Drinks', 3.50, 30, true, 'Fresh squeezed'),
('Latte', 'Drinks', 4.50, 80, true, 'Espresso with steamed milk'),
('Cappuccino', 'Drinks', 4.25, 70, true, 'Espresso with foamed milk'),
('Espresso', 'Drinks', 3.00, 100, true, 'Strong black coffee shot'),
('Americano', 'Drinks', 3.50, 90, true, 'Espresso with hot water'),
('Iced Coffee', 'Drinks', 3.75, 60, true, 'Chilled brewed coffee over ice'),
('Iced Latte', 'Drinks', 4.75, 60, true, 'Cold espresso with milk'),
('Mocha', 'Drinks', 5.00, 50, true, 'Chocolate flavored latte'),
('Hot Chocolate', 'Drinks', 4.00, 40, true, 'Rich chocolate drink'),
('Chai Latte', 'Drinks', 4.50, 40, true, 'Spiced tea with milk'),
('Green Tea', 'Drinks', 2.75, 50, true, 'Hot green tea'),
('Black Tea', 'Drinks', 2.50, 50, true, 'Classic black tea'),

('Croissant', 'Food', 3.50, 40, true, 'Buttery flaky pastry'),
('Chocolate Croissant', 'Food', 4.00, 35, true, 'Croissant filled with chocolate'),
('Muffin', 'Food', 3.25, 45, true, 'Assorted flavors'),
('Blueberry Muffin', 'Food', 3.50, 40, true, 'Fresh blueberry muffin'),
('Banana Bread', 'Food', 3.75, 30, true, 'Moist banana loaf slice'),
('Scone', 'Food', 3.50, 30, true, 'Baked scone with jam'),
('Donut', 'Food', 2.75, 50, true, 'Classic glazed donut'),

('Grilled Cheese Sandwich', 'Food', 5.50, 25, true, 'Toasted sandwich with melted cheese'),
('Ham & Cheese Sandwich', 'Food', 6.50, 25, true, 'Ham and cheese on toasted bread'),
('Turkey Sandwich', 'Food', 6.75, 20, true, 'Turkey with lettuce and tomato'),
('Chicken Panini', 'Food', 7.50, 20, true, 'Grilled chicken pressed sandwich'),
('Veggie Wrap', 'Food', 6.00, 20, true, 'Wrap with fresh vegetables'),

('Caesar Salad', 'Food', 6.50, 15, true, 'Romaine lettuce with Caesar dressing'),
('Greek Salad', 'Food', 6.75, 15, true, 'Salad with feta, olives, and veggies'),

('Yogurt Parfait', 'Food', 4.50, 25, true, 'Yogurt with granola and fruit'),
('Fruit Cup', 'Food', 4.00, 25, true, 'Fresh mixed fruit'),
('Oatmeal', 'Food', 3.75, 20, true, 'Warm oatmeal with toppings'),

('Smoothie', 'Drinks', 5.50, 30, true, 'Blended fruit smoothie'),
('Strawberry Smoothie', 'Drinks', 5.75, 25, true, 'Strawberry banana smoothie'),
('Mango Smoothie', 'Drinks', 5.75, 25, true, 'Mango flavored smoothie'),

('Bottled Water', 'Drinks', 2.00, 100, true, 'Chilled bottled water'),
('Sparkling Water', 'Drinks', 2.50, 60, true, 'Carbonated water'),
('Soft Drink', 'Drinks', 2.75, 60, true, 'Assorted sodas');
