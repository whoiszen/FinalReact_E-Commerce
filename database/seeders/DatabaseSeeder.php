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
        User::updateOrCreate(
            ['email' => 'admin@luminary.com'],
            [
                'name' => 'Admin',
                'password' => Hash::make('password'),
                'is_admin' => true,
                'phone' => '+63 900 000 0001',
            ]
        );

        User::updateOrCreate(
            ['email' => 'demo@luminary.com'],
            [
                'name' => 'Demo Customer',
                'password' => Hash::make('password'),
                'is_admin' => false,
                'phone' => '+63 912 345 6789',
            ]
        );

        $productBlueprints = [
            [
                'collection' => 'Eternal Rose',
                'type' => 'Diamond Ring',
                'category' => 'diamond-rings',
                'material' => 'VS1 Diamond',
                'carat' => '1.2ct',
                'metal' => '18K Rose Gold',
                'certification' => 'GIA Certified',
                'short_description' => 'A romantic solitaire ring with exceptional brilliance.',
                'description' => 'Crafted to celebrate timeless devotion, this piece pairs a precisely cut diamond with a hand-finished setting for a refined luxury statement.',
                'price' => 185000,
                'sale_price' => 159000,
                'image' => 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=700',
                'tags' => ['ring', 'diamond', 'rose gold', 'solitaire'],
            ],
            [
                'collection' => 'Celestial',
                'type' => 'Tennis Bracelet',
                'category' => 'diamond-bracelets',
                'material' => 'Round Brilliant Diamonds',
                'carat' => '5.0ct Total',
                'metal' => 'Platinum',
                'certification' => 'IGI Certified',
                'short_description' => 'An elegant line bracelet with luminous sparkle.',
                'description' => 'A continuous row of matched diamonds creates fluid movement and standout brilliance in a polished luxury bracelet silhouette.',
                'price' => 320000,
                'sale_price' => null,
                'image' => 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=700',
                'tags' => ['bracelet', 'tennis', 'diamond', 'platinum'],
            ],
            [
                'collection' => 'Aurora',
                'type' => 'Drop Earrings',
                'category' => 'diamond-earrings',
                'material' => 'Pear-Cut Diamonds',
                'carat' => '2.4ct Total',
                'metal' => '18K White Gold',
                'certification' => 'GIA Certified',
                'short_description' => 'Graceful diamond drops designed to catch the light.',
                'description' => 'These earrings combine elongated lines and lively sparkle, creating a refined piece made for formal occasions and elevated daily wear.',
                'price' => 145000,
                'sale_price' => 119000,
                'image' => 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=700',
                'tags' => ['earrings', 'drop', 'pear-cut', 'white gold'],
            ],
            [
                'collection' => 'Constellation',
                'type' => 'Diamond Necklace',
                'category' => 'diamond-necklaces',
                'material' => 'Round and Princess Diamonds',
                'carat' => '3.8ct Total',
                'metal' => '18K Yellow Gold',
                'certification' => 'GIA Certified',
                'short_description' => 'A celestial necklace with layered brilliance.',
                'description' => 'Inspired by the night sky, this necklace arranges diamonds in a dramatic composition that feels both modern and heirloom-worthy.',
                'price' => 275000,
                'sale_price' => null,
                'image' => 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=700',
                'tags' => ['necklace', 'diamond', 'yellow gold', 'statement'],
            ],
            [
                'collection' => 'Sovereign',
                'type' => 'Diamond Watch',
                'category' => 'diamond-watches',
                'material' => 'Baguette and Round Diamonds',
                'carat' => '8.5ct Total',
                'metal' => 'Stainless Steel and 18K Gold',
                'certification' => 'Swiss Movement',
                'short_description' => 'A diamond-set timepiece with commanding presence.',
                'description' => 'Combining horology and jewelry, this watch balances precision engineering with a lavish diamond setting for a bold luxury finish.',
                'price' => 890000,
                'sale_price' => null,
                'image' => 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700',
                'tags' => ['watch', 'diamond', 'luxury', 'timepiece'],
            ],
            [
                'collection' => 'Luminary',
                'type' => 'Solitaire Pendant',
                'category' => 'diamond-pendants',
                'material' => 'Round Brilliant Diamond',
                'carat' => '1.0ct',
                'metal' => 'Platinum',
                'certification' => 'GIA Certified',
                'short_description' => 'A timeless pendant centered on a brilliant diamond.',
                'description' => 'Minimal and elegant, this pendant keeps the focus on a precisely selected stone suspended from a sleek precious metal chain.',
                'price' => 95000,
                'sale_price' => null,
                'image' => 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=700',
                'tags' => ['pendant', 'solitaire', 'diamond', 'platinum'],
            ],
            [
                'collection' => 'Imperial',
                'type' => 'Loose Diamond',
                'category' => 'loose-diamonds',
                'material' => 'Princess Cut Diamond',
                'carat' => '2.0ct',
                'metal' => null,
                'certification' => 'GIA Certified',
                'short_description' => 'A premium loose diamond ideal for custom settings.',
                'description' => 'Selected for superior clarity and color, this loose diamond offers an exceptional foundation for bespoke jewelry commissions.',
                'price' => 220000,
                'sale_price' => null,
                'image' => 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=700',
                'tags' => ['loose diamond', 'princess cut', 'gia', 'custom'],
            ],
            [
                'collection' => 'Infinity',
                'type' => 'Eternity Ring',
                'category' => 'diamond-rings',
                'material' => 'Round Brilliant Diamonds',
                'carat' => '2.0ct Total',
                'metal' => 'Platinum',
                'certification' => 'IGI Certified',
                'short_description' => 'A continuous diamond band with timeless appeal.',
                'description' => 'Designed as a symbol of enduring love, this eternity ring wraps the finger in a seamless line of carefully matched stones.',
                'price' => 135000,
                'sale_price' => null,
                'image' => 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=700',
                'tags' => ['ring', 'eternity', 'platinum', 'anniversary'],
            ],
            [
                'collection' => 'Halo',
                'type' => 'Stud Earrings',
                'category' => 'diamond-earrings',
                'material' => 'Round Brilliant Diamonds',
                'carat' => '1.6ct Total',
                'metal' => '18K White Gold',
                'certification' => 'GIA Certified',
                'short_description' => 'Classic halo studs with amplified sparkle.',
                'description' => 'These studs frame bright center stones with a precise halo arrangement, delivering impact while staying effortlessly wearable.',
                'price' => 78000,
                'sale_price' => null,
                'image' => 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=700',
                'tags' => ['earrings', 'studs', 'halo', 'white gold'],
            ],
            [
                'collection' => 'Velvet Crown',
                'type' => 'Diamond Choker',
                'category' => 'diamond-necklaces',
                'material' => 'Marquise and Round Diamonds',
                'carat' => '4.2ct Total',
                'metal' => '18K White Gold',
                'certification' => 'IGI Certified',
                'short_description' => 'A modern choker with regal diamond detailing.',
                'description' => 'A sculptural neckline piece that layers marquise and round stones into a striking silhouette with couture-inspired polish.',
                'price' => 310000,
                'sale_price' => 279000,
                'image' => 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=700',
                'tags' => ['necklace', 'choker', 'diamond', 'white gold'],
            ],
        ];

        $editions = [
            'Signature',
            'Reserve',
            'Nocturne',
            'Radiance',
            'Prestige',
        ];

        $generatedProducts = [];

        for ($i = 0; $i < 50; $i++) {
            $blueprint = $productBlueprints[$i % count($productBlueprints)];
            $edition = $editions[intdiv($i, count($productBlueprints))];
            $name = "{$blueprint['collection']} {$edition} {$blueprint['type']}";
            $price = $blueprint['price'] + (intdiv($i, count($productBlueprints)) * 12500);
            $salePrice = $blueprint['sale_price']
                ? $blueprint['sale_price'] + (intdiv($i, count($productBlueprints)) * 10000)
                : null;

            $generatedProducts[$name] = [
                'category' => $blueprint['category'],
                'price' => $price,
                'sale_price' => $salePrice,
                'material' => $blueprint['material'],
                'carat' => $blueprint['carat'],
                'metal' => $blueprint['metal'],
                'certification' => $blueprint['certification'],
                'short_description' => $blueprint['short_description'],
                'description' => "{$blueprint['description']} {$edition} edition crafted for collectors who want a distinctive take on the original design.",
                'stock' => 2 + (($i * 3) % 11),
                'rating' => min(5, 4.6 + (($i % 5) * 0.1)),
                'reviews_count' => 8 + ($i * 3),
                'is_featured' => $i < 8,
                'is_active' => true,
                'tags' => array_values(array_unique([...$blueprint['tags'], strtolower($edition)])),
                'images' => [$blueprint['image']],
                'deleted_at' => null,
            ];
        }

        Product::query()
            ->whereNotIn('name', array_keys($generatedProducts))
            ->delete();

        foreach ($generatedProducts as $name => $data) {
            Product::withTrashed()->updateOrCreate(
                ['name' => $name],
                $data
            );
        }
    }
}
