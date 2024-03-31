<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('rides', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedBigInteger('start_station_id');
            $table->foreign('start_station_id')->references('id')->on('stations')->onDelete('cascade')->onUpdate('cascade');
            $table->unsignedBigInteger('end_station_id');
            $table->foreign('end_station_id')->references('id')->on('stations')->onDelete('cascade')->onUpdate('cascade');
            $table->time('start_time');
            $table->time('end_time');
            $table->decimal('price', 8, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rides');
    }
};
