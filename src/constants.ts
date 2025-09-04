import { Task, StockData } from './types';

export const OPENING_TASKS: Task[] = [
  { id: 1, name: "Unlock Bathroom", completed: false, type: 'toggle' },
  { id: 2, name: "Check that there are at least 2 toilet rolls in the bathroom", completed: false, type: 'toggle' },
  { id: 3, name: "Check menu board", description: "Are the beers that are actually on tap the same as on the menu board. Contact Carl if you have any questions.", completed: false, type: 'radio', options: ['Board was correct', 'Board needed updating, which I did', 'Board needed updating but I did not update it'] },
  { id: 4, name: "Put fresh water and tablet in Spulboy", completed: false, type: 'toggle' },
  { id: 5, name: "Switch air conditioner on", completed: false, type: 'toggle' },
  { id: 6, name: "Check beer quality", description: "Have a small taste of each beer on tap. If there are any off flavours, swap kegs and use the 'Other' field to make a note of which beer was swapped.", completed: false, type: 'radio', options: ['All beers taste fine', 'Other'] },
  { id: 7, name: "Switch on lamps and under bar lights", completed: false, type: 'toggle' },
  { id: 8, name: "Take Happy Hour sign outside", completed: false, type: 'toggle' },
  { id: 9, name: "Change window sign to \"Open\"", completed: false, type: 'toggle' },
];

export const CLOSING_TASKS: Task[] = [
    { id: 1, name: 'Change window sign to "Closed"', completed: false, type: 'toggle' },
    { id: 2, name: 'Bring Happy Hour sign inside', completed: false, type: 'toggle' },
    { id: 3, name: 'Notify Carl about shortages', description: 'If we are low or out of stock on any particular items (including food, napkins etc.), let Carl know.', completed: false, type: 'toggle' },
    { id: 4, name: 'Close all outstanding bar tabs', description: 'There should never be any tabs open at the end of a shift. If for ANY reason a tab has not been closed, please use the text field to explain why.', completed: false, type: 'toggle', isOptional: true },
    { id: 5, name: 'Clean all glassware and dishes', completed: false, type: 'toggle' },
    { id: 6, name: 'Plug in iPad and Yoco', completed: false, type: 'toggle' },
    { id: 7, name: 'Lock store room', completed: false, type: 'toggle' },
    { id: 8, name: 'Check prepaid electricity meter', description: 'Notify Carl if meter is on less than 20 units.', completed: false, type: 'toggle' },
    { id: 9, name: 'Lock bathroom', completed: false, type: 'toggle' },
    { id: 10, name: 'Lock back door', completed: false, type: 'toggle' },
    { id: 11, name: 'Switch off lamps and under bar lights', completed: false, type: 'toggle' },
    { id: 12, name: 'Switch off airconditioner', completed: false, type: 'toggle' },
];

export const INITIAL_STOCK_DATA: StockData = {
  spirits: [
    { name: "African Dry Gin" },
    { name: "Bain's" },
    { name: "Balvenie" },
    { name: "Die Mas 5y/o Brandy" },
    { name: "El Jimador" },
    { name: "Floating Dutchman" },
    { name: "Jägermeister" },
    { name: "Jameson" },
    { name: "Johnnie Walker Black" },
    { name: "Rooster" },
    { name: "Stolichnaya" },
    { name: "Ugly Gin" },
  ],
  cansAndBottles: [
    { name: "Coke Can 300ml" },
    { name: "Coke Zero Can 300ml" },
    { name: "Hero 330ml" },
    { name: "Loxtonia Stonefruit Cider 330ml" },
    { name: "Lubanzi Bubbly Rosè 250ml" },
    { name: "Lubanzi Chenin Blanc 250ml" },
    { name: "Lubanzi Cinsaut 750ml" },
    { name: "Lubanzi Shiraz 250ml" },
    { name: "Lubanzi Sauvignon Blanc 750ml" },
    { name: "Philippi Cab Sav Merlot 750 ml" },
    { name: "Philippi Sauvignon Blanc 750 ml" },
    { name: "Red Bull 250ml" },
    { name: "Savannah Dry 300ml" },
    { name: "Spier Merlot 250ml" },
    { name: "Spier Sav Blanc 250ml" },
    { name: "Tomato Cocktail 200ml" },
    { name: "Tonic 200ml" },
  ],
  food: [
    { name: "Biltong" },
    { name: "Chilli Sticks" },
    { name: "Pizza - BFP" },
    { name: "Pizza - Pepperoni" },
    { name: "Pizza - Margherita" },
    { name: "Pizza - Vegan" },
    { name: "Pizza - Vegetarian" },
  ],
  brewersReserve: [
    { name: "Barrel-Aged Imperial Stout" },
    { name: "Sour Cherry Lambic" },
    { name: "Double IPA (Special)" },
  ],
};

export const ALL_STOCK_ITEMS: string[] = [
    ...INITIAL_STOCK_DATA.spirits.map(i => i.name),
    ...INITIAL_STOCK_DATA.cansAndBottles.map(i => i.name),
    ...INITIAL_STOCK_DATA.food.map(i => i.name),
    ...INITIAL_STOCK_DATA.brewersReserve.map(i => i.name),
].sort();


export const CORE_VALUES: string[] = [
    "Kindness & Respect: Treat everyone with warmth and respect.",
    "Inclusivity: Celebrate diversity and welcome all.",
    "Tolerance: Respect differing viewpoints and encourage dialogue.",
    "Good Humour: Cultivate a lighthearted and fun atmosphere.",
    "Honesty: Unwavering honesty in business and personal interactions.",
    "Respectful Boundaries: Zero tolerance for harmful ideologies or behaviours; value diverse views, but not bigotry."
];
