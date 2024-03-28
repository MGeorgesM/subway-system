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
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->unsignedBigInteger('departure_ride_id');
            $table->foreign('departure_ride_id')->references('id')->on('rides')->onDelete('cascade')->onUpdate('cascade');
            $table->unsignedBigInteger('return_ride_id')->nullable();
            $table->foreign('return_ride_id')->references('id')->on('rides')->onDelete('cascade')->onUpdate('cascade')->nullable();
            $table->decimal('price', 8, 2);
            $table->boolean('activated')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
