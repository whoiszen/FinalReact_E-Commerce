<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Admin user
        User::create([
            'name'     => 'Admin',
            'email'    => 'admin@luminary.com',
            'password' => Hash::make('password'),
            'is_admin' => true,
            'phone'    => '+63 900 000 0001',
        ]);

        // Demo customer
        User::create([
            'name'     => 'Demo Customer',
            'email'    => 'demo@luminary.com',
            'password' => Hash::make('password'),
            'is_admin' => false,
            'phone'    => '+63 912 345 6789',
        ]);

        $products = [
            [
                'name'              => 'Eternal Rose Diamond Ring',
                'category'          => 'diamond-rings',
                'price'             => 185000.00,
                'sale_price'        => 159000.00,
                'material'          => 'VS1 Diamond',
                'carat'             => '1.2ct',
                'metal'             => '18K Rose Gold',
                'certification'     => 'GIA Certified',
                'short_description' => 'Breathtaking VS1 diamond solitaire in 18K rose gold.',
                'description'       => 'An eternal symbol of devotion, this exquisite 1.2 carat VS1 diamond is expertly set in a hand-crafted 18K rose gold band. GIA certified for your complete confidence. The diamond\'s exceptional cut maximizes brilliance, creating a mesmerizing display of light.',
                'stock'             => 8,
                'rating'            => 4.9,
                'reviews_count'     => 47,
                'is_featured'       => true,
                'tags'              => ['ring', 'diamond', 'rose gold', 'solitaire', 'engagement'],
                'images'            => ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=700'],
            ],
            [
                'name'              => 'Celestial Diamond Tennis Bracelet',
                'category'          => 'diamond-bracelets',
                'price'             => 320000.00,
                'material'          => 'Round Brilliant Diamonds',
                'carat'             => '5.0ct Total',
                'metal'             => 'Platinum',
                'certification'     => 'IGI Certified',
                'short_description' => '5ct total weight diamond tennis bracelet in platinum.',
                'description'       => 'Forty perfectly matched round brilliant diamonds totaling 5 carats cascade along a flexible platinum setting. Each stone is individually hand-set and secured with four-prong settings ensuring maximum security and brilliance.',
                'stock'             => 4,
                'rating'            => 5.0,
                'reviews_count'     => 23,
                'is_featured'       => true,
                'tags'              => ['bracelet', 'tennis', 'diamond', 'platinum', 'luxury'],
                'images'            => ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=700'],
            ],
            [
                'name'              => 'Aurora Diamond Drop Earrings',
                'category'          => 'diamond-earrings',
                'price'             => 145000.00,
                'sale_price'        => 119000.00,
                'material'          => 'Pear-Cut Diamonds',
                'carat'             => '2.4ct Total',
                'metal'             => '18K White Gold',
                'certification'     => 'GIA Certified',
                'short_description' => 'Pear-cut diamond drops that dance with every movement.',
                'description'       => 'These captivating drop earrings feature pear-cut diamonds that cascade beautifully from diamond-studded tops. Totaling 2.4 carats of GIA-certified stones, they create an ethereal aurora of light with every movement.',
                'stock'             => 6,
                'rating'            => 4.8,
                'reviews_count'     => 31,
                'is_featured'       => true,
                'tags'              => ['earrings', 'drop', 'pear-cut', 'white gold'],
                'images'            => ['https://images.unsplash.com/photo-1630019852942-f89202989a59?w=700'],
            ],
            [
                'name'              => 'Constellation Diamond Necklace',
                'category'          => 'diamond-necklaces',
                'price'             => 275000.00,
                'material'          => 'Round & Princess Diamonds',
                'carat'             => '3.8ct Total',
                'metal'             => '18K Yellow Gold',
                'certification'     => 'GIA Certified',
                'short_description' => 'Stars aligned — a celestial diamond necklace.',
                'description'       => 'Inspired by the night sky, this stunning necklace arranges 38 round brilliant and princess-cut diamonds in a constellation pattern. The 18K yellow gold chain adds warmth to the sparkling diamonds.',
                'stock'             => 3,
                'rating'            => 4.9,
                'reviews_count'     => 18,
                'is_featured'       => true,
                'tags'              => ['necklace', 'constellation', 'yellow gold'],
                'images'            => ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=700'],
            ],
            [
                'name'              => 'Sovereign Diamond Watch',
                'category'          => 'diamond-watches',
                'price'             => 890000.00,
                'material'          => 'Baguette & Round Diamonds',
                'carat'             => '8.5ct Total',
                'metal'             => 'Stainless Steel + 18K Gold',
                'certification'     => 'Swiss Movement',
                'short_description' => 'Swiss-made timepiece adorned with 8.5ct of diamonds.',
                'description'       => 'A masterpiece of horology and jewelry combined. The bezel, dial, and bracelet are adorned with 8.5 carats of baguette and round brilliant diamonds. Swiss mechanical movement with sapphire crystal glass.',
                'stock'             => 2,
                'rating'            => 5.0,
                'reviews_count'     => 9,
                'is_featured'       => true,
                'tags'              => ['watch', 'diamond', 'swiss', 'luxury', 'timepiece'],
                'images'            => ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700'],
            ],
            [
                'name'              => 'Luminary Solitaire Pendant',
                'category'          => 'diamond-pendants',
                'price'             => 95000.00,
                'material'          => 'Round Brilliant Diamond',
                'carat'             => '1.0ct',
                'metal'             => 'Platinum',
                'certification'     => 'GIA Certified',
                'short_description' => 'Classic 1ct round brilliant diamond pendant in platinum.',
                'description'       => 'Timeless elegance distilled into a single perfect diamond. This 1.0 carat round brilliant diamond is GIA certified and suspended from a delicate platinum chain. A forever piece passed down through generations.',
                'stock'             => 12,
                'rating'            => 4.7,
                'reviews_count'     => 62,
                'is_featured'       => false,
                'tags'              => ['pendant', 'solitaire', 'platinum', 'round'],
                'images'            => ['https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=700'],
            ],
            [
                'name'              => 'Princess Cut Loose Diamond',
                'category'          => 'loose-diamonds',
                'price'             => 220000.00,
                'material'          => 'Princess Cut Diamond',
                'carat'             => '2.0ct',
                'metal'             => null,
                'certification'     => 'GIA Certified — D Color, VVS1',
                'short_description' => '2ct princess cut, D color, VVS1 clarity. GIA certified.',
                'description'       => 'An exceptional 2.0 carat princess cut diamond graded D color and VVS1 clarity by the GIA. This near-flawless stone is ideal for a custom engagement ring or investment piece. Certificate #2497382615.',
                'stock'             => 5,
                'rating'            => 5.0,
                'reviews_count'     => 14,
                'is_featured'       => false,
                'tags'              => ['loose', 'princess cut', 'D color', 'VVS1'],
                'images'            => ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=700'],
            ],
            [
                'name'              => 'Infinity Diamond Eternity Ring',
                'category'          => 'diamond-rings',
                'price'             => 135000.00,
                'material'          => 'Round Brilliant Diamonds',
                'carat'             => '2.0ct Total',
                'metal'             => 'Platinum',
                'certification'     => 'IGI Certified',
                'short_description' => 'Full eternity band with round brilliants in platinum.',
                'description'       => 'A continuous circle of round brilliant diamonds symbolizing eternal love. Set in a precision-crafted platinum band, this full eternity ring features perfectly matched stones for an unbroken line of fire and brilliance.',
                'stock'             => 7,
                'rating'            => 4.8,
                'reviews_count'     => 38,
                'is_featured'       => false,
                'tags'              => ['ring', 'eternity', 'platinum', 'anniversary'],
                'images'            => ['https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=700'],
            ],
            [
                'name'              => 'Halo Diamond Stud Earrings',
                'category'          => 'diamond-earrings',
                'price'             => 78000.00,
                'material'          => 'Round Brilliant Diamonds',
                'carat'             => '1.6ct Total',
                'metal'             => '18K White Gold',
                'certification'     => 'GIA Certified',
                'short_description' => 'Classic halo studs — brilliant center with diamond halo.',
                'description'       => 'Each stud features a brilliant center diamond surrounded by a micro-pavé halo of smaller diamonds, creating the illusion of a much larger stone. 1.6 carats total weight in 18K white gold.',
                'stock'             => 3,
                'rating'            => 4.9,
                'reviews_count'     => 55,
                'is_featured'       => false,
                'tags'              => ['earrings', 'studs', 'halo', 'white gold'],
                'images'            => ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=700'],
            ],
        ];

        foreach ($products as $data) {
            Product::create($data);
        }
    }
}
